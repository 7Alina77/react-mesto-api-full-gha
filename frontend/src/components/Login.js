import React, {useState} from "react";

function Login({onSubmit}) {
  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  });

  const handleChangeLogin = (e) => {
    const {name, value} = e.target;
    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    if(!formValue.email || !formValue.password) {
      return;
    }
    onSubmit(formValue.email, formValue. password);
    setFormValue({email: '', password: ''});
  }

  return(
    <section className="authorization">
      <h2 className="authorization__title">Вход</h2>
        <form onSubmit={handleSubmitLogin} className='authorization__form' /**noValidate*/>
          <div className="authorization__container">
            <input className='authorization__input'
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleChangeLogin}          
            ></input>
            <input className='authorization__input'
              name="password"
              type="password"
              placeholder="Пароль"
              onChange={handleChangeLogin}
            ></input>
          </div>
          <button className="authorization__submit" type="submit">Войти</button>
        </form>
    </section>
  )
}

export default Login;