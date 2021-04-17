const express = require("express");
const Drone = require("../models/Drone.model");
const router = express.Router();

// require the Drone model here

router.get("/drones", (req, res, next) => {
  // Iteration #2: List the drones
  Drone.find().then((allDrones) => {
    console.log(allDrones);
    res.render("drones/list.hbs", { allDrones });
  });
});

router.get("/drones/create", (req, res, next) => {
  // Iteration #3: Add a new drone
  res.render("drones/create-form.hbs");
});

router.post("/drones/create", (req, res, next) => {
  // Iteration #3: Add a new drone
  const { name, propellers, maxSpeed } = req.body;
  console.log(name, propellers, maxSpeed);

  Drone.create({ name, propellers, maxSpeed })
    .then((data) => {
      console.log(data);
      res.redirect("/drones");
    })
    .catch((err) => console.log(err));
});

router.get("/drones/:id/edit", (req, res, next) => {
  // Iteration #4: Update the drone
  const { id } = req.params;
  console.log(req.params);
  Drone.findById(id).then((data) => {
    res.render("drones/update-form.hbs", { data });
  });
});

router.post("/drones/:id/edit", (req, res, next) => {
  // Iteration #4: Update the drone
  const { id } = req.params;
  const { name, propellers, maxSpeed } = req.body;

  Drone.findByIdAndUpdate(id, { name, propellers, maxSpeed })
    .then((data) => {
      res.redirect("/drones");
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/drones/:id/delete", (req, res, next) => {
  // Iteration #5: Delete the drone
  const { id } = req.params;

  Drone.findByIdAndDelete(id)
    .then((data) => {
      res.redirect("/drones");
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
