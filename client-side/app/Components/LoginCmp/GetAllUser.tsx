

interface UserProp{
 
    id:string,
    email:string,
    name:string,
    picture:string,
   
}
const GetAllUsers = async (): Promise<UserProp[]> => {
    try {
        const res = await fetch('http://localhost:8080/get/allusers');
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        const users:UserProp[] = await res.json();
        return users;
    } catch (err) {
        console.error('Fetch error:', err);
        return []; // Return an empty array in case of an error
    }
};

export default GetAllUsers;