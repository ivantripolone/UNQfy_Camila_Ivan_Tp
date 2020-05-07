module.exports= class TrackDoesNotExistsError extends Error
{
  constructor(){
    super(' This Track does\'t exist');
    this.name= 'TrackDoesNotExistError';
  }
};