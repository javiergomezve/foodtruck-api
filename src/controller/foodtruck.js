import { Router } from 'express';
import Foodtruck from '../model/foodtruck';
import Review from '../model/review';
import { authenticate } from "../middleware/auth";

export default({config, db}) => {
  const api = Router();

  api.get('/', (req, res) => {
    Foodtruck.find({})
      .then(foodtrucks => {
        res.json(foodtrucks)
      })
      .catch(err => {
          res.send(err)
      });
  });

  api.get('/:id', (req, res) => {
    Foodtruck.findById(req.params.id)
      .then(foodtruck => {
          res.json(foodtruck)
      })
      .catch(err => {
          res.send(err)
      });
  });

  api.post('/', authenticate, (req, res) => {
    const newFoodtruck = new Foodtruck();
    newFoodtruck.name = req.body.name;
    newFoodtruck.foodType = req.body.foodType;
    newFoodtruck.avgCost = req.body.avgCost;
    newFoodtruck.geometry.coordinates.lat = req.body.geometry.coordinates.lat;
    newFoodtruck.geometry.coordinates.long = req.body.geometry.coordinates.long
    newFoodtruck.save(err => {
      if (err) res.send(err);

      res.json({message: 'Foodtruck saved successfully'});
    });
  });

  api.put('/:id', authenticate, (req, res) => {
    Foodtruck.findById(req.params.id)
      .then(foodtruck => {
        foodtruck.name = req.body.name;
        foodtruck.foodType = req.body.foodType;
        foodtruck.avgCost = req.body.avgCost;
        foodtruck.geometry.coordinates.lat = req.body.geometry.coordinates.lat;
        foodtruck.geometry.coordinates.long = req.body.geometry.coordinates.long;

        foodtruck.save(err => {
          if (err) res.send(err);

          res.json({message: 'Foodtruck info updated'});
        });
      })
      .catch(err => {
        res.send(err);
      });
  });

  api.delete('/:id', authenticate, (req, res) => {
    Foodtruck.findById(req.params.id, (err, foodtruck) => {
      if (err) {
        res.status(500).send(err);
        return;
      }

      if (foodtruck === null) {
        res.status(404).json({message: 'Foodtruck do not exist'});
        return;
      }

      Foodtruck.remove({_id: req.params.id}, (err, foodtruck) => {
        if (err) {
          res.status(500).send(err);
          return;
        }

        res.json({message: 'Foodtruck deleted'});
      });
    });
  });

  api.post('/:id/review', authenticate, (req, res) => {
    Foodtruck.findById(req.params.id, (err, foodtruck) => {
      if (err) {
        return res.send(err);
      }

      if (!foodtruck) {
        return res.json({message: "Foodtruck does not exists"});
      }


      const newReview = new Review();
      newReview.title = req.body.title;
      newReview.text = req.body.text;
      newReview.foodtruck = foodtruck._id;
      newReview.save((err, review) => {
        if (err) {
          return res.send(err);
        }

        Foodtruck.findOneAndUpdate(
          {_id: req.params.id},
          {$push: {reviews: review}},
          err =>{
              if (err) return res.send(err);

              return res.json({message: 'Review saved successfully'});
          });
      });
    });
  });

  api.get('/:id/review', (req, res) => {
    Review.find({foodtruck: req.params.id})
      .then(reviews => {
        res.json(reviews)
      })
      .catch(err => {
        res.json({message: 'Foodtruck has not reviews'});
      });
  });

  return api;
};
