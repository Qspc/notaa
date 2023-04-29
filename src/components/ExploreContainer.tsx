import './ExploreContainer.css';

interface ContainerProps {
  name: string;
}

const ExploreContainer: React.FC<ContainerProps> = ({ name }) => {
  return (
    <div className="container">
      <h1>
        <strong>Notaa</strong>
      </h1>
      <p>
        Aplikasi pencatatan perjalanan
        {/* Explore
        <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/components">
          UI Components
        </a> */}
      </p>
    </div>
  );
};

export default ExploreContainer;
