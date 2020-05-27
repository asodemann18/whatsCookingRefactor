import { expect } from 'chai';

import User from '../src/user';
import users from '../src/data/users-data';
import recipeData from '../src/data/recipe-data'
import RecipeRepo from '../src/recipeRepo'

describe('User', function() {
  let user;
  let userInfo;
  let recipe;

  beforeEach(function() {
    userInfo = users[0];
    user = new User(userInfo)

    recipe = recipeData[0];
  });

  it('should be a function', function() {
    expect(User).to.be.a('function');
  });

  it('should initialize with an id', function() {
    expect(user.id).to.eq(1);
  });

  it('should initialize with a name', function() {
    expect(user.name).to.eq('Saige O\'Kon');
  });

  it.skip('should initialize with a pantry', function() {
    expect(user.pantry[0].ingredient).to.eq(11477);
  });

  it('should check if recipe can be cooked', function() {
    expect(user2.checkAbility2Cook(recipe)).to.be.true
  });

  it('should check if recipe can be cooked', function() {
    let user2 = new User(users[1]);
    expect(user2.checkAbility2Cook(recipe)).to.be.false
  });

  it('should be able to cook a recipe', function() {
    user.cookRecipe(recipe);
    expect(user.pantry[0].amount).to.equal(2.5);
    expect(user.pantry[4].amount).to.equal(0);
    expect(user.pantry[12].amount).to.equal(1);
  });

  it('should return the required ingredients if user cannot cook recipe', function() {
    let user2 = new User(users[1]);
    let requiredIngredients =   [
      {name: 'egg', id: 1123, requiredQuantity: 1},
      {name: 'granulated sugar', id: 19335, requiredQuantity: 0.5 },
      {name: 'instant vanilla pudding mix', id: 19206, requiredQuantity: 2},
      {name: 'light brown sugar', id: 19334, requiredQuantity: 0.5 },
      {name: 'salt', id: 2047, requiredQuantity: 0.5}
    ]
    expect(user2.findRequiredIngredients(recipe)).to.deep.equal(requiredIngredients);
  });

  it('should be able to find a recipe from a designated recipe repo', function() {
    let recipeRepo = new RecipeRepo(recipeData);
    let randomRecipe = recipeData[Math.floor(Math.random() * users.length)];
    let foundRecipe = user.findRecipe(recipeRepo.recipes, randomRecipe);
    expect(foundRecipe).to.deep.equal(randomRecipe);
  });

  it('should return a message when recipe is not found', function() {
    let randomRecipe = recipeData[Math.floor(Math.random() * users.length)];
    let foundRecipe = user.findRecipe(recipeRepo.favoriteRecipes, randomRecipe);
    expect(foundRecipe).to.equal('Sorry, recipe not found');
  });
});
