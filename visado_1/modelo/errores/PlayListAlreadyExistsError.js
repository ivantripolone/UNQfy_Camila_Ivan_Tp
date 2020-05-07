module.exports = class PlayListAlreadyExistsError extends Error
{
  constructor(){
    super(' This PlayList already exists');
    this.name= 'PlayListExistsError';
  }
};