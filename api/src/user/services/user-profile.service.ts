import { Injectable, Inject } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { IImageStorageService } from "../../image-storage/interfaces/image-storage";
import { Repositories, Services } from "../../utils/constants";
import { generateUUIDV4 } from "../../utils/helpers";
import { User } from "../../utils/typeorm";
import { Profile } from "../../utils/typeorm/entities/Profile";
import { UpdateUserProfileParams } from "../../utils/types";
import { Repository } from "typeorm";
import { IUserProfile } from "../interfaces/user-profile";

@Injectable()
export class UserProfileService implements IUserProfile {
  constructor(
    @Inject(Repositories.PROFILE)
    private readonly profileRepository: Repository<Profile>,
    @Inject(Repositories.USER)
    private readonly userRepository: Repository<User>,
    @Inject(Services.IMAGE_UPLOAD_SERVICE)
    private readonly imageStorageService: IImageStorageService,
  ) {}

  createProfile() {
    const newProfile = this.profileRepository.create();
    return this.profileRepository.save(newProfile);
  }

  async createProfileOrUpdate(user: User, params: UpdateUserProfileParams) {
    console.log('CreateProfileOrUpdate');
    if (!user.profile) {
      console.log('User has no profile. Creating...');
      user.profile = await this.createProfile();
      return this.updateProfile(user, params);
    }
    console.log('User has profile');
    return this.updateProfile(user, params);
  }

  async updateProfile(user: User, params: UpdateUserProfileParams) {
    console.log(params);
    if (params.avatar)
      user.profile.avatar = await this.updateAvatar(params.avatar);
    if (params.banner)
      user.profile.banner = await this.updateBanner(params.banner);
    if (params.about) user.profile.about = params.about;
    return this.userRepository.save(user);
  }

  async updateBanner(file: Express.Multer.File) {
    console.log('Updating Banner');
    const key = generateUUIDV4();
    await this.imageStorageService.upload({ key, file });
    return key;
  }

  async updateAvatar(file: Express.Multer.File) {
    console.log('Updating Avatar');
    const key = generateUUIDV4();
    await this.imageStorageService.upload({ key, file });
    return key;
  }
}