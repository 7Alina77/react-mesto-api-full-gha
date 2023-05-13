import React, {useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";

function Register({onSubmit}) {
  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  });

  const handleChangeRegister = (e) => {
    const {name, value} = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  const handleSubmitRegister = (e) => {
    e.preventDefault();
    if(!formValue.email || !formValue.password) {
      return;
    }
    onSubmit(formValue.email , formValue.password);
    setFormValue({
      email:'', 
      password: ''
    })
  }

  return (
    <section className="authorization">
      <h2 className="authorization__title">Регистрация</h2>
        <form onSubmit={handleSubmitRegister} className='authorization__form' /**noValidate*/>
          <div className="authorization__container">
            <input className='authorization__input'
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleChangeRegister}          
            ></input>
            <input className='authorization__input'
              name="password"
              type="password"
              placeholder="Пароль"
              onChange={handleChangeRegister}
            ></input>
          </div>
          <button className="authorization__submit" type="submit">Зарегистрироваться</button>
        </form>
        <div className="authorization__login">
          <p>Уже зарегистрированы?</p>
          <Link to='/sign-in'className="authorization__link">Войти</Link>
        </div>
    </section>
  )
}

export default Register;