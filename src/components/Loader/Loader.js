import s from './loader.module.css';

export default function Loader() {
  return (
    <div className={s.spinner}>
      <span className={s.bounce__circle}></span>
      <span className={s.bounce__circle}></span>
      <span className={s.bounce__circle}></span>
    </div>
  );
}
