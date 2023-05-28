import { Link, useLocation, useParams } from "react-router-dom";

const UsernavPage = () => {

    const {pathname} = useLocation();
    let subpage = pathname.split('/')?.[2];
    if(subpage === undefined){
        subpage = 'profile';
    }
    
    function linkClasses(type=null){
        let classes = 'py-2 px-6 border-green-500 rounded-full border';
       if(type === subpage){
        classes += ' bg-green-400 text-white';
       }
       return classes;
    }
  return (
    <div>
         <nav className="mb-8 bg-green-100 bg-opacity-70 z-[1] fixed w-full flex justify-center mt-8 gap-4 ">
    <Link className={linkClasses('profile')} to={'/account'}>Account</Link>
    <Link className={linkClasses('owners')} to={'/account/owners'}>Owners</Link>
    <Link className={linkClasses('organimals')} to={'/account/organimals'}>Animals</Link>
 </nav>
      
    </div>
  )
}

export default UsernavPage
