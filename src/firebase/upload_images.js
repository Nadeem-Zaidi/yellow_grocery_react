import { storage } from "./firebase_connection"
import { ref, uploadBytesResumable, getDownloadURL } from '@firebase/storage';

const uploadImages = async (image) => {
    if (image == null) {
        return
    }
    const storageRef = ref(storage, `yellowgrocery/${image.name}`)
    const uploadTask = uploadBytesResumable(storageRef, image)
    try {
        // Listen for state changes
        uploadTask.on("state_changed", (snapshot) => {
            console.log(snapshot);
        });

        await uploadTask;
        // Once upload is complete, get the download URL
        const url = await getDownloadURL(uploadTask.snapshot.ref);

        return url

    } catch (error) {
        // Handle any errors that occur during the upload or URL retrieval
        throw error
    }
}
export default uploadImages