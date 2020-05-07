module.exports= class PlayListDoesNotExistsError extends Error
{
  constructor(){
    super(' This PlayList does\'t exist');
    this.name= 'PlayListDoesNotExistError';
  }
};