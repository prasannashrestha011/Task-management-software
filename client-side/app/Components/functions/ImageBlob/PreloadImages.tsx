const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
const PreLoadImages = async (imageUrls: string[]) => {
  const promises = imageUrls.map(async (url) => {
    const response = await fetch(`${url}`,{
      mode:'no-cors'
    });
    const blob = await response.blob();
    const objectUrl = URL.createObjectURL(blob);
    return objectUrl;
  });

  try {
    return await Promise.all(promises);
  } catch (error) {
    console.error('Failed to preload images:', error);
    return [];
  }
};
const PreLoadImage=async(imgurl:string):Promise<string>=>{
 const promises=async()=>{
  const response=await fetch(imgurl)
  const blob=await response.blob();
  const objurl=URL.createObjectURL(blob)
  return objurl as string
 }
 try{
  return await Promise.resolve(promises())
 }catch(err){
  console.log(err)
  return "" as string
 }
}
  export  {PreLoadImages,PreLoadImage}
