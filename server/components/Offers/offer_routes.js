import express from "express";

import { createOffer, getAllOffers, getOffer } from "./offer_controller.js";
const route = express.Router();

route.post("/create-offer", createOffer);
route.get("/one-offer/:id", getOffer);
route.get("/all-offer", getAllOffers);

export default route;
