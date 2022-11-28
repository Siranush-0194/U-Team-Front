import { Switch, Space } from 'antd';

import './App.scss';

// i18n languages
import './i18n';
import { useTranslation } from 'react-i18next';

// Components
import Login from "./components/Login";
import ResetPassword from './pages/Dashboard/Invitation/resetPass';

function App() {
  const { i18n } = useTranslation();

  const changeLanguage = () => {
    i18n.changeLanguage(i18n.language === 'am' ? 'en' : 'am');
  };

  return (
    <div className="App">
      <header>
        <div>Logo</div>

        <nav>
          Menu
        </nav>

        <Space direction="vertical">
          <Switch checkedChildren="Eng" unCheckedChildren="հայ" defaultChecked onChange={changeLanguage} />
        </Space>
      </header>

      <section>
        <Login />
        
      </section>
    </div>
  );
}

export default App;
