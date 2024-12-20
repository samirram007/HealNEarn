import { lowerCase } from '@/lib/removeEmptyStrings';
import { useUserprofile } from '@/modules/User/hooks/useUserProfile';
import { useEffect, useState } from 'react';

import { Link } from 'react-router';

const Breadcrumb = ({ pageName, parentName = 'Dashboard',
  display = true,
  type = 'default', }) => {

  const userProfile = useUserprofile()

  const [typeString, setTypeString] = useState('mb-6 flex   md:flex-row  gap-3 sm:flex-row sm:items-center sm:justify-between');

  useEffect(() => {

    if (type === 'box') {
      setTypeString(`sm:w-full  text-xs  flex  flex-col md:flex-col gap-3  
          items-start  md:items-start  justify-start md:justify-center`);
    }

  }, [type])
  if (!display) {
    return <></>;
  }
  return (
    <div className={`${typeString} motion-translate-x-in-[100%]   motion-duration-100 text-teal-600 capitalize`}>
      <h2 className="text-title-md2 font-semibold  text-teal-600  ">
        {pageName}
      </h2>

      <nav>
        <ol className="flex items-center gap-2">
          <li>
            <Link className="font-medium" to={`/${userProfile.data?.data.data.role}/${lowerCase(parentName)}`}>
              {parentName} /
            </Link>
          </li>
          <li className="font-medium text-slate-500">{pageName}</li>
        </ol>
      </nav>
    </div>
  );
};




export default Breadcrumb;
