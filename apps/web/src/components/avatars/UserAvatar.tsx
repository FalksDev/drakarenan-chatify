import { User } from "utils/types"
import userAvatarPlaceholder from "../../assets/user-avatar-placeholder.png";

type Props = {
    user: User | undefined;
    hasProfilePicture?: boolean;
}

// TODO: When we start to upload images, we need to take the users.avatar instead from the "DigitalOcean.CDN"
    // CDN_URL.BASE.concat(recipient?.profile?.avatar!)
export const UserAvatar = ({ user, hasProfilePicture = false } : Props) => {
    return (
        <div>
            {hasProfilePicture ? (
                <div className="h-14 w-14 rounded-full shadow-lg">
                    <img className="object-cover" src={userAvatarPlaceholder} />
                </div>
            ) : (
                <div className="h-14 w-14 rounded-full shadow-lg">
                    <img className="object-cover" src={userAvatarPlaceholder} />
                </div>
            )}
        </div>
    )
}