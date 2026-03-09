import Image from '../../../assets/image-25.jpeg';
import { Outlet} from 'react-router-dom';

const PublicLayout = () => {
  return (
    <div className="relative min-h-screen overflow-hidden flex items-center justify-center">
      {/* Background layer: absolute, di belakang, hanya elemen ini yang di-blur */}
      <div
        className="absolute inset-0 bg-center bg-cover -z-10"
        style={{
          backgroundImage: `url(${Image})`,
          filter: 'blur(8px)',
          transform: 'scale(1.05)', // sedikit scale untuk menghindari tepi terlihat saat blur
        }}
        aria-hidden="true"
      />

      {/* Optional: overlay untuk kontras (gelapkan/lighten) */}
      <div className="absolute inset-0 bg-black/30 -z-10" aria-hidden="true" />

      {/* Konten -- tidak ikut blur karena berada di layer atas */}
      <div className="relative z-10 text-center  px-6">
        
        <Outlet />
      </div>
    </div>
  );
};

export default PublicLayout;
