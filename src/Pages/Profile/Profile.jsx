import useAuth from "../../Hooks/useAuth";

const Profile = () => {
  const { user } = useAuth();
  return (
    <div className='mx-auto my-10 flex max-w-[350px] flex-col items-center justify-center space-y-4 rounded-xl bg-white p-8 font-sans shadow-lg dark:bg-[#18181B]'>
      <div className='group relative'>
        <img
          width={110}
          height={110}
          className='h-[110px] w-[110px] rounded-full bg-slate-500 object-cover'
          src={user?.photoURL}
          alt='profile'
        />
        <span className='absolute bottom-3 right-0 h-5 w-5 rounded-full border-[3px] border-white bg-green-500 dark:border-[#18181B]'></span>
        <span className='absolute bottom-3 right-0 h-5 w-5 animate-ping rounded-full bg-green-500'></span>
      </div>
      <div className='space-y-1 text-center'>
        <h1 className='text-2xl text-gray-700 dark:text-white/90'>
          {user?.displayName}
        </h1>
        <p className='text-sm text-gray-400'>Web Developer</p>
      </div>

      {/* bio  */}
      <p className='pb-2 text-center text-sm text-gray-500'>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolore error
        ipsum officiis debitis quo odio?
      </p>
    </div>
  );
};
export default Profile;
