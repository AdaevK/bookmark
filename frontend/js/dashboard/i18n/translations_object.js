const translationsObject = {
  ru: {
    sign_in_form: {
      fields: {
        email: 'Email',
        password: 'Пароль',
      },
      page: {
        header: 'Вход',
        submit: 'Войти',
        sign_up_link: 'Создать аккаунт'
      }
    },
    sign_up_form: {
      fields: {
        email: 'Email',
        password: 'Пароль',
        password_confirmation: 'Подтверждение пароля',
        first_name: 'Имя',
        last_name: 'Фамилия',
      },
      page: {
        header: 'Регистрация',
        submit: 'Зарегистрироваться',
        sign_in_link: 'Войти',
      }
    },
    folder_form: {
      fields: {
        name: 'Название папки',
      },
      page: {
        submit: 'Добавить',
      }
    },
    errors: {
      required: 'не может быть пустым',
      email:    'не верный формат',
      eqfield:  'не совпадает с подтверждением',
      unique_user_email: 'такой email уже существует',
      invalid_email_or_password: 'Не верный адрес эл.почты или пароль'
    }
  }
}

export default translationsObject
