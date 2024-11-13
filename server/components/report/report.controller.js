import { Parser } from "json2csv";
import UserModel from "../Users/user_module.js";
import ProjectModel from "../Project/project_modules.js";
import OfferModel from "../Offers/offer_module.js";
import NeedModel from "../Need/need_module.js";
import ConnectionModel from "../Connection/connection_module.js";

export const downloadDataReport = async (req, res) => {
  try {
    // Fetch data from each collection
    const users = await UserModel.find().lean();
    const projects = await ProjectModel.find()
      .populate("associatedUsers")
      .lean();
    const offers = await OfferModel.find().populate("userId").lean();
    const needs = await NeedModel.find().populate("userId").lean();
    const connections = await ConnectionModel.find()
      .populate("user1 user2")
      .lean();

    // Prepare data for CSV export
    const csvData = [];

    users.forEach((user) => {
      const userProjects = projects.filter((p) =>
        p.associatedUsers.some((u) => u._id.equals(user._id))
      );
      const userOffers = offers.filter((o) => o.userId._id.equals(user._id));
      const userNeeds = needs.filter((n) => n.userId._id.equals(user._id));
      const userConnections = connections.filter((c) =>
        [c.user1._id, c.user2._id].includes(user._id)
      );

      csvData.push({
        fullName: user.fullName,
        email: user.email,
        gender: user.gender,
        role: user.role,
        projectCount: userProjects.length,
        offerCount: userOffers.length,
        needCount: userNeeds.length,
        connectionCount: userConnections.length,
      });
    });

    // Define CSV fields
    const fields = [
      { label: "Full Name", value: "fullName" },
      { label: "Email", value: "email" },
      { label: "Gender", value: "gender" },
      { label: "Role", value: "role" },
      { label: "Projects Involved", value: "projectCount" },
      { label: "Offers Created", value: "offerCount" },
      { label: "Needs Created", value: "needCount" },
      { label: "Connections", value: "connectionCount" },
    ];

    // Convert JSON to CSV
    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(csvData);

    // Send CSV file as a downloadable response
    res.header("Content-Type", "text/csv");
    res.attachment("user_project_offer_need_connection_report.csv");
    return res.send(csv);
  } catch (error) {
    console.log("Error generating report:", error.message);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};
