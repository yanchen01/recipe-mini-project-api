const axios = require('axios')
const JOULES_TO_CAL = 1 / 4.184

async function getIngredientsCalories (ingredients) {
    const API_URL= 'http://api.nal.usda.gov/fdc/v1/foods';

    let total_Cal = 0;

    for (let ingredient of ingredients) {
        const response = await axios.get(`${API_URL}/search?api_DEMO_KEY&query=${JSON.stringify(ingredient.name)}`);
        const item = response.data.foods.length > 0 ? response.data.foods[0] : null;
        if (item) {
            let energy_Obj = item.foodNutrients.filter((nutrient) => nutrient.nutrientId === 1008);
            energy_Obj = energy_Obj[0];
            total_Cal += energy_Obj.value * JOULES_TO_CAL;
        }
    }
    return Math.round(total_Cal);
}

exports.getIngredientsCalories = getIngredientsCalories;
