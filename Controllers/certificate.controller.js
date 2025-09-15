import Certificate from "../Models/certificate.model.js";

const IssueCertificate = async (req, res) => {
    const { eventId, participantId, url } = req.body;
    try {
        const certificate = new Certificate({
            event_id: eventId,
            participant_id: participantId,
            url: url
        });
        await certificate.save();
        res.status(201).json({
            success: true,
            message: "Certificate issued successfully",
            data: certificate
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export { IssueCertificate };

const GetCertificates = async (req, res) => {
    try {
        const certificates = await Certificate.find().populate('participant_id').populate('event_id');
        res.status(200).json({
            success: true,
            data: certificates
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export { GetCertificates };

const GetCertificateById = async (req, res) => {
    const certificateId = req.params.id;
    try {
        const certificate = await Certificate.findById(certificateId).populate('participant_id').populate('event_id');
        if (!certificate) {
            return res.status(404).json({
                success: false,
                message: "Certificate not found"
            });
        }
        res.status(200).json({
            success: true,
            data: certificate
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}
export { GetCertificateById };


const DeleteCertificate = async (req, res) => {
    const certificateId = req.params.id;
    try {
        const certificate = await Certificate.findById(certificateId);
        if (!certificate) {
            return res.status(404).json({
                success: false,
                message: "Certificate not found"
            });
        }
        await certificate.remove();
        res.status(200).json({
            success: true,
            message: "Certificate deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}
export { DeleteCertificate };




