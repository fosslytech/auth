// Translations

export interface ITranslations {
  header: {
    appName: string;
    useOnline: string;
    settings: string;
    signIn: string;
    avatar: {
      label1: string;
      switchAcc: string;
      signOut: string;
    };
  };
  pages: {
    auth_confirm: {
      title: string;
      description: string;
      openMailApp: string;
      goBack: string;
    };
    auth_forgot: {
      title: string;
      subtitle: string;
      mailLabel: string;
      mailPlaceholder: string;
      toLogin: string;
      button: string;
      errors: {
        email: string;
      };
    };
    auth_login: {
      title: string;
      noAccount: string;
      registerCta: string;
      mailLabel: string;
      mailPlaceholder: string;
      passwordLabel: string;
      passwordPlaceholder: string;
      rememberLabel: string;
      forgot: string;
      button: string;
      buttonGH: string;
      buttonGL: string;
      errors: {
        email: string;
        password: string;
      };
    };
    auth_register: {
      title: string;
      yesAccount: string;
      loginCta: string;
      mailLabel: string;
      mailPlaceholder: string;
      passwordLabel: string;
      passwordPlaceholder: string;
      generateTooltip: string;
      button: string;
      buttonGH: string;
      buttonGL: string;
      errors: {
        email: string;
        password: string;
      };
    };
    auth_reset: {
      title: string;
      subtitle: string;
      password1Label: string;
      password1Placeholder: string;
      generateTooltip: string;
      password2Label: string;
      password2Placeholder: string;
      button: string;
      errors: {
        password1: string;
        password2: string;
      };
    };
    user: {
      details: {
        title: string;
        download: string;
        provider: {
          gitlab: string;
          github: string;
          email: string;
        };
      };
      danger: {
        title: string;

        deleteDocDescription: string;
        deleteDocButton: string;

        deleteAccDescription: string;
        deleteAccButton: string;
      };
    };
    user_deleted: {
      title: string;
      description: string;
      newAcc: string;
      goBack: string;
    };

    error: {
      title: string;
      '404': string;
      '401': string;
      '500': string;
      button: string;
    };
  };
  components: {};
}
