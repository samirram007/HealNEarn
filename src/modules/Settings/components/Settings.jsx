import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import { motion } from "motion/react";
import { GoListOrdered } from 'react-icons/go';
import { HiMiniClipboardDocumentCheck } from 'react-icons/hi2';
import { LiaHotelSolid } from 'react-icons/lia';
import { MdOutlineBedroomParent } from 'react-icons/md';
import { RiHotelLine } from 'react-icons/ri';
import { NavLink } from 'react-router';
import { } from './settings.css';
const Settings = () => {

  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}
        whileInView={{ opacity: 1 }} className="mx-auto  ">
        <Breadcrumb pageName="Settings" />
        <motion.div className='chicklet-panel'>
          <Chicklet index={0} link={'students'} title={'Student'} icon={<LiaHotelSolid className='icon icon-red  ' />} />
          <Chicklet index={1} link={'building'} title={'Building'} icon={<RiHotelLine className='icon icon-violet  ' />} />
          <Chicklet index={2} link={'floor'} title={'Floor'} icon={<GoListOrdered className='icon icon-orange  ' />} />
          <Chicklet index={3} link={'room'} title={'Room'} icon={<MdOutlineBedroomParent className='icon  icon-yellow ' />} />
          {/* <Chicklet index={4} link={'amenity'} title={'Amenity'} icon={<GiMagicBroom className='icon icon-pink  ' />} /> */}
          <Chicklet index={5} link={'documents'} title={'Document'} icon={<HiMiniClipboardDocumentCheck className='icon icon-green ' />} />
        </motion.div>
      </motion.div >
    </>
  );
};

export default Settings;

const Chicklet = ({ index, link, title, icon }) => {
  const variants = {
    visible: (custom) => ({
      opacity: 1,
      transition: { delay: custom * 0.2 }
    })
  }
  return (
    <>
      <NavLink to={`/${link}`}>
        <motion.div custom={index} icon={icon} animate="visible" variants={index} className='chicklet' >
          {icon}

          <div className='text'>
            {title}
          </div>
        </motion.div>
      </NavLink>
    </>
  )

}
