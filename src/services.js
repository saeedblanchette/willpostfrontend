import { axiosAuthInstance, anonymousInstance, TokenManager } from './axiosApi';

export const authManager = () => {
  const tokens = TokenManager();
  const logout = () => {};
  const isLogedin = () => {};
  const isValid = () => {
   
    return !tokens.areTokensExpired();
  };
  const confirmLogin = ({ uid, token }) => {
    
    return axiosAuthInstance.post('/auth/confirm/' + uid + '/' + token + '/');
  };
  const reSendVerification = () => {
    return axiosAuthInstance.post('/auth/confirm/send/');
  };
  return { logout, isLogedin, isValid, confirmLogin, reSendVerification };
};

export const anonymousManager = () => {
  const tokens = TokenManager();
  const register = async () => {};
  const login = async ({ email, password }) => {
    return anonymousInstance.post('dj-rest-auth/login/', { email, password });
  };
  const setCredentials = data => {
    tokens.setTokens(data);
    const { user } = data;
 
    localStorage.setItem('user', JSON.stringify(user));
  };
  const resendEmail = ({ email }) => {
    return anonymousInstance.post('dj-rest-auth/registration/resend-email/', {
      email,
    });
  };
  const confirmExistence = ({ urlsignature }) => {

    return anonymousInstance.post('confirmation/exc/', { urlsignature });
  };
  const VoteEligibility = ({ urlsignature }) => {
    return anonymousInstance.get(`vote/${urlsignature}`);
  };
  const vote = ({ vote_value, urlsignature }) => {
    return anonymousInstance.post('vote/', { urlsignature, vote_value });
  };
  const post = ({ urlsignature }) => {
    return anonymousInstance.get(`post/${urlsignature}`);
  };
  return {
    setCredentials,
    register,
    login,
    resendEmail,
    confirmExistence,
    VoteEligibility,
    vote,
    post,
  };
};
export const userService = () => {
  const update = ({
    username,
    email,
    phone,
    last_name,
    first_name,
    number_of_dayes_before_notifying,
    vote_type,
  }) => {
    return axiosAuthInstance.patch('/dj-rest-auth/user/', {
      username,
      email,
      phone,
      last_name,
      first_name,
      number_of_dayes_before_notifying,
      vote_type,
    });
  };
  const get = () => {
    return axiosAuthInstance.get('/dj-rest-auth/user/');
  };
  const changePassword = async ({
    old_password,
    new_password1,
    new_password2,
  }) => {
    return axiosAuthInstance.post('/dj-rest-auth/password/change/', {
      old_password,
      new_password1,
      new_password2,
    });
  };
  const logout = () => {
    const tokens = TokenManager();
    tokens.removeTokens();
    return axiosAuthInstance.post('/dj-rest-auth/logout/');
  };

  return {
    logout,
    get,
    update,
    changePassword,
  };
};
export const ContactService = () => {
  const create = async ({
    username,
    email,
    phone,
    last_name,
    first_name,
    is_safe_guard,
  }) => {
    return axiosAuthInstance.post('contact/', {
      email,
      phone,
      last_name,
      first_name,
      is_safe_guard,
    });
  };
  const update = async ({
    id,
    username,
    email,
    is_safe_guard,
    last_name,
    first_name,
  }) => {
    const url = `contact/${id}`;
    return axiosAuthInstance.patch(url, {
      id,
      username,
      email,
      is_safe_guard,
      last_name,
      first_name,
    });
  };
  const deleteContact = async id => {
    const url = `contact/${id}`;
    return axiosAuthInstance.delete(url);
  };
  const get = async id => {};
  const getList = async () => {
    return axiosAuthInstance.get('contact/');
  };

  return {
    getList,
    create,
    update,
    deleteContact,
    get,
  };
};
export const PostService = () => {
  const create = async (
    { file, media_type = 'AUDIO', contacts = [] },
    onUploadProgressHanadler = null,
    cancelToken = null
  ) => {
    const formdata = new FormData();
    let filename = 'sound.wav';
    if (media_type !== 'AUDIO') {
      filename = 'Video.webm';
    }
    formdata.append('file', file, filename);
    formdata.append('media_type', media_type);
    for (const key in contacts) {
      formdata.append('recipients', contacts[key]);
    }

    return axiosAuthInstance.post(
      'media/',

      formdata,
      {
        onUploadProgress: onUploadProgressHanadler,
        cancelToken: cancelToken && cancelToken.source,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
  };
  const createAudio = async (
    { file, media_type = 'AUDIO', contacts = [] },
    onUploadProgressHanadler = null
  ) => {
    const formdata = new FormData();
    if (media_type === 'AUDIO') {
      formdata.append('file', file, 'sound.wav');
    } else {
      formdata.append('file', file, 'video.webm');
    }
    formdata.append('media_type', media_type);
    for (const key in contacts) {
      formdata.append('recipients', contacts[key]);
    }

    return axiosAuthInstance.post(
      'media/',

      formdata,
      {
        onUploadProgress: onUploadProgressHanadler,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
  };
  const update = async (
    id,
    { file, media_type = 'AUDIO', recipients = [] }
  ) => {
    const url = `media/${id}`;

    const formdata = new FormData();

    if (file && typeof file !== 'string') {
      if (media_type === 'AUDIO') {
        formdata.append('file', file, 'sound.wav');
      } else {
        formdata.append('file', file, 'video.webm');
      }
    }

    if (Array.isArray(recipients) && recipients.length > 0) {
      for (const key in recipients) {
        formdata.append('recipients', recipients[key]);
      }
    }
    formdata.append('media_type', media_type);
    return axiosAuthInstance.patch(url, formdata, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };
  const deleteMedia = async id => {
    const url = `media/${id}`;
    return axiosAuthInstance.delete(url);
  };
  const get = async id => {};
  const getList = async () => {
    return axiosAuthInstance.get('media/');
  };
  const uploadViaAjax = async (
    { file, media_type = 'AUDIO', recipients = [] },
    onUploadProgressHanadler = null
  ) => {
    let xhr = new XMLHttpRequest();
    const formdata = new FormData();

    if (file && typeof file !== 'string') {
      if (media_type === 'AUDIO') {
        formdata.append('file', file, 'sound.wav');
      } else {
        formdata.append('file', file, 'video.webm');
      }
    }

    if (Array.isArray(recipients) && recipients.length > 0) {
      for (const key in recipients) {
        formdata.append('recipients', recipients[key]);
      }
    }
    formdata.append('media_type', media_type);
    xhr.open('POST', 'http://localhost:8000/media/', true);
    xhr.onprogress = onUploadProgressHanadler;
    // xhr.setRequestHeader('Content-Type', 'multipart/form-data');
    xhr.setRequestHeader(
      'Authorization',
      'Bearer ' + localStorage.getItem('access_token')
    );
    return xhr.send(formdata);
  };

  return {
    createAudio,
    uploadViaAjax,
    getList,
    create,
    update,
    deleteMedia,
    get,
  };
};
