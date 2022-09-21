export const generateToken=(length)=>{
  let rand=()=>Math.random(0).toString(36).substr(2);
  return (rand()+rand()+rand()+rand()).substr(0,length)
}
