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
        new: {
          header: 'Добавление папки',
          submit: 'Добавить',
        },
        edit: {
          header: 'Редактирование папки',
          submit: 'Сохранить',
        },
        cancel: 'Закрыть'
      }
    },
    link_form: {
      fields: {
        url: 'Ссылка на страницу'
      },
      page: {
        header: 'Добавить страницу',
        submit: 'Добавить',
        cancel: 'Закрыть'
      }
    },
    confirmation: {
      delete_folder: 'Удалить папку?',
      delete_link: 'Удалить страницу?'
    },
    errors: {
      not_authorized: 'Необходимо авторизоваться',
      not_found: 'Объект не найден',
      required: 'не может быть пустым',
      email:    'не верный формат',
      eqfield:  'не совпадает с подтверждением',
      unique_user_email: 'такой email уже существует',
      unique_folder_name: 'такое название папки уже существует',
      invalid_email_or_password: 'Не верный адрес эл.почты или пароль'
    },
    notifications: {
      title: {
        success: 'Оповещение',
        info: 'Оповещение',
        warning: 'Предупреждение',
        error: 'Ошибка',
      },
      session: {
        sign_in: 'Вход выполнен',
        sign_out: 'Выход выполнен'
      },
      registration: {
        create: 'Регистрация успешно выполнена'
      },
      folders: {
        create: 'Папка успешно добавлена',
        update: 'Папка успешно обновлена',
        destroy: 'Папка успешно удалена'
      },
      links: {
        create: 'Страница успешно добавлена',
        destroy: 'Страница успешно удалена'
      }
    }
  }
}

export default translationsObject
