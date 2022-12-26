import { PostWithCallbackParams } from "./types";

export async function postWithCallback(params: PostWithCallbackParams) {
    try {
        await params.postFunction();
        params.onSuccess?.();
    } catch(err) {
        console.log(err);
        params.onError?.();
    }
}