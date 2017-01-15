const request = require('request');

module.exports = {
    'searchZomatoAndShowRestaurants': function searchZomatoAndShowRestaurants(senderID, cuisine, callback) {
        request({
            url: 'https://developers.zomato.com/api/v2.1/search',
            qs: {
                entity_id: '5413',
                entity_type: 'subzone',
                cuisines: cuisine,
                sort: 'rating',
                order: 'asc'
            },
            'headers': {
                'user-key': 'bf26cd84bace20c847c733cba3d092b3'
            }
        }, (err, res, body) => {
            // console.log(err, body);
            if (!err && res.statusCode === 200) {
                body = JSON.parse(body);
                const restaurants = body
                    .restaurants
                    .slice(0, 3);
                callback(senderID, restaurants, cuisine);
            }
        });
    },
    'searchForRestaurant': function searchForRestaurant(senderID, restaurantName, callback) {
        request({
            'url': 'https://developers.zomato.com/api/v2.1/search',
            'qs': {
                entity_id: '5413',
                entity_type: 'subzone',
                sort: 'real_distance',
                q: restaurantName
            },
            'headers': {
                'user-key': 'bf26cd84bace20c847c733cba3d092b3'
            }
        }, (err, res, body) => {
            if (!err && res.statusCode === 200) {
                body = JSON.parse(body);
                const restaurant = body.restaurant[0].restaurant;
                callback(senderID, restaurant, cuisine);
            }
        });
    }
};