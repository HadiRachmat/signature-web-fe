import { useNavigate } from 'react-router-dom';
import Button from '../../../atoms/public/button';
const HomePage = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="text-white">
        <h1 className="sm:text-5xl text-3xl uppercase mt-2">Selamat Datang</h1>
        <p> di website Monitoring hafalan alquran </p>
        <Button
          type="button"
          title="Mulai"
          onClick={() => navigate('/home/login')}
          disabled={false}
        />
      </div>
    </>
  );
};

export default HomePage;
