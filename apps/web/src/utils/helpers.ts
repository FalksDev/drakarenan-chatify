import { PostWithCallbackParams } from "./types";

export async function postWithCallback(params: PostWithCallbackParams) {
    try {
        const test = await params.postFunction();
        params.onSuccess?.();
    } catch(err) {
        console.log(err);
        params.onError?.();
    }
}