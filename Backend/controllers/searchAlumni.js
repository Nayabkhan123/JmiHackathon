const userModel = require("../models/userModel");

async function searchAlumni(req, res) {
    try {
        const {
            inputData = "",
            filterOption = "",
            sortOption = "",
            sortOrder = ""
        } = req.body;

        const regex = new RegExp(inputData.trim(), "i");

        let filterField;
        switch (filterOption.toLowerCase()) {
            case "batch":
                filterField = "batch";
                break;
            case "branch":
                filterField = "department";
                break;
            case "job-title":
                filterField = "profession";
                break;
            case "location":
                filterField = "location";
                break;
            default:
                filterField = "name";
                break;
        }

        // Build search query
        const query = inputData.trim()
            ? { [filterField]: regex }
            : {};

        // Build sort object
        let sortQuery = {};
        if (sortOption) {
            const sortFieldMap = {
                name: "name",
                graduationYear: "batch",
                profession: "profession",
                location: "location"
            };

            const fieldToSort = sortFieldMap[sortOption] || "name";
            sortQuery[fieldToSort] = sortOrder === "desc" ? -1 : 1;
        }

        const alumni = await userModel.find(query).sort(sortQuery);

        res.status(200).json({
            message: inputData.trim()
                ? `Filtered by ${filterOption || "name"}`
                : "All Alumni",
            data: alumni,
            success: true,
            error: false,
        });

    } catch (err) {
        res.status(400).json({
            success: false,
            error: true,
            message: err.message || "Something went wrong",
        });
    }
}

module.exports = searchAlumni;