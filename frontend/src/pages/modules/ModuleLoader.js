import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../Header';

const ModuleLoader = () => {
  const { language, moduleNumber } = useParams();
  const capitalizedLanguage = language.charAt(0).toUpperCase() + language.slice(1);
  const ModuleComponent = React.lazy(() => import(`../modules/${language}/Module${moduleNumber}`));

  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Header />
      <>
      <Link to={`/${language}-modules`}>
      <h2>{`${capitalizedLanguage}`} Modules Home</h2>
      </Link>
      </>
      <ModuleComponent />
    </React.Suspense>
  );
};

export default ModuleLoader;
