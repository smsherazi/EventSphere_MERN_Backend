import MediaGallery from "../Models/mediaGallery.model.js";
import imagekit from "../Helpers/imageKit.js"; // import helper

const AddMedia = async (req, res) => {
    const { eventId, fileType } = req.body;
    const files = req.files; // from multer middleware

    if (!files || files.length === 0) {
        return res.status(400).json({ success: false, message: "No files uploaded" });
    }

    try {
        const uploadedFiles = [];

        for (let file of files) {
            // Upload to ImageKit
            const result = await imagekit.upload({
                file: file.buffer, // multer memoryStorage buffer
                fileName: file.originalname
            });

            // Save to MongoDB
            const media = new MediaGallery({
                event_id: eventId,
                file_type: fileType,
                url: result.url
            });
            await media.save();
            uploadedFiles.push(media);
        }

        res.status(201).json({
            success: true,
            message: "Media uploaded successfully",
            data: uploadedFiles
        });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export { AddMedia };


const GetMedia = async (req, res) => {
    try {
        const mediaItems = await MediaGallery.find().populate('event_id');
        res.status(200).json({
            success: true,
            data: mediaItems
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export { GetMedia };

const GetMediaById = async (req, res) => {
    const mediaId = req.params.id;
    try {
        const media = await MediaGallery.findById(mediaId).populate('event_id');
        if (!media) {
            return res.status(404).json({
                success: false,
                message: "Media not found"
            });
        }
        res.status(200).json({
            success: true,
            data: media
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}
export { GetMediaById };

const UpdateMedia = async (req, res) => {   
    const mediaId = req.params.id;
    const { eventId, fileType, url } = req.body;
    try {
        const media = await MediaGallery.findById(mediaId);
        if (!media) {
            return res.status(404).json({
                success: false,
                message: "Media not found"
            });
        }
        media.event_id = eventId || media.event_id;
        media.file_type = fileType || media.file_type;
        media.url = url || media.url;
        await media.save();
        res.status(200).json({
            success: true,
            message: "Media updated successfully",
            data: media
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}
export { UpdateMedia };

const DeleteMedia = async (req, res) => {
    const mediaId = req.params.id;
    try {
        const media = await MediaGallery.findByIdAndDelete(mediaId);
        if (!media) {
            return res.status(404).json({
                success: false,
                message: "Media not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Media deleted successfully"
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}
export { DeleteMedia };

