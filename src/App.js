// 13 create styles directory in src
// 12
import styles from './App.module.css';
import NavBar from './components/NavBar';

// 3 remove header/ add test button and import 
// 4 create components folder in src and add NavBar and add here navbar component and go to it


function App() {
  return (
    // 12
    <div className={styles.App}>
      <NavBar />
    </div>
  );
}

export default App;

// In the JSX code, we define the responsive values for our columns as props.
// The xs is the size for all screen sizes, and 
// the md value applies to  medium size screens and up.