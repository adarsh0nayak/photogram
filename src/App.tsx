import { RouterProvider } from 'react-router-dom';
import { routes } from './routes';

export interface IAppProps {
}

export default function App (props: IAppProps) {
  return (
      <RouterProvider router={routes}></RouterProvider>
  );
}
