module.exports = class TrackAlreadyExistsError extends Error
{
  constructor(){
    super(' This Track already exists');
    this.name= 'TrackExistsError';
  }
};