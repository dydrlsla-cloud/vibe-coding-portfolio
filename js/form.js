/**
 * Contact form - FormSubmit (AJAX)
 */
(function () {
  'use strict';

  var RECIPIENT_EMAIL = 'ykkim@bigautosys.co.kr';
  var FORM_AJAX_URL = 'https://formsubmit.co/ajax/' + RECIPIENT_EMAIL;

  var form = document.getElementById('contactForm');
  if (!form) return;

  var submitBtn = document.getElementById('submitBtn');
  var formStatus = document.getElementById('formStatus');
  var privacyToggle = document.getElementById('privacyToggle');
  var privacyBox = document.getElementById('privacyBox');
  var companyInput = document.getElementById('company');

  var fields = {
    name: {
      input: document.getElementById('name'),
      error: document.getElementById('nameError'),
      validate: function (value) {
        if (!value.trim()) return '성명을 입력해 주세요.';
        if (value.trim().length < 2) return '성명은 2자 이상 입력해 주세요.';
        return '';
      }
    },
    email: {
      input: document.getElementById('email'),
      error: document.getElementById('emailError'),
      validate: function (value) {
        if (!value.trim()) return '이메일을 입력해 주세요.';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return '올바른 이메일 형식을 입력해 주세요.';
        return '';
      }
    },
    message: {
      input: document.getElementById('message'),
      error: document.getElementById('messageError'),
      validate: function (value) {
        if (!value.trim()) return '메시지를 입력해 주세요.';
        if (value.trim().length < 10) return '메시지는 10자 이상 입력해 주세요.';
        return '';
      }
    },
    privacy: {
      input: document.getElementById('privacy'),
      error: document.getElementById('privacyError'),
      validate: function (checked) {
        if (!checked) return '개인정보 수집 및 이용에 동의해 주세요.';
        return '';
      }
    }
  };

  function getCompanyLabel() {
    var company = companyInput ? companyInput.value.trim() : '';
    if (company) return company;
    var name = fields.name.input.value.trim();
    return name || '회사명 미입력';
  }

  function buildEmailSubject() {
    var subjectValue = document.getElementById('subject').value;
    return '[빅오토시스] 견적/문의: ' + subjectValue + ' - ' + getCompanyLabel();
  }

  if (privacyToggle && privacyBox) {
    privacyToggle.addEventListener('click', function () {
      privacyBox.hidden = !privacyBox.hidden;
    });
  }

  function showFieldError(field, message) {
    field.input.classList.toggle('error', !!message);
    field.error.textContent = message;
  }

  function clearErrors() {
    Object.keys(fields).forEach(function (key) {
      showFieldError(fields[key], '');
    });
    hideStatus();
  }

  function validateForm() {
    var isValid = true;

    Object.keys(fields).forEach(function (key) {
      var field = fields[key];
      var value = key === 'privacy' ? field.input.checked : field.input.value;
      var error = field.validate(value);
      showFieldError(field, error);
      if (error) isValid = false;
    });

    return isValid;
  }

  function showStatus(message, type) {
    formStatus.textContent = message;
    formStatus.className = 'form-status ' + type;
    formStatus.hidden = false;
  }

  function hideStatus() {
    formStatus.hidden = true;
    formStatus.className = 'form-status';
  }

  function setLoading(loading) {
    var btnText = submitBtn.querySelector('.btn__text');
    var btnLoader = submitBtn.querySelector('.btn__loader');
    submitBtn.disabled = loading;
    btnText.hidden = loading;
    btnLoader.hidden = !loading;
  }

  async function submitForm() {
    var formData = new FormData(form);

    formData.set('_subject', buildEmailSubject());
    formData.set('_template', 'table');
    formData.set('_captcha', 'false');
    formData.set('_replyto', fields.email.input.value.trim());

    var response = await fetch(FORM_AJAX_URL, {
      method: 'POST',
      headers: {
        Accept: 'application/json'
      },
      body: formData
    });

    var result = await response.json();

    if (response.ok && result.success) {
      showStatus('메시지가 성공적으로 전송되었습니다. 빠른 시일 내에 답변드리겠습니다.', 'success');
      form.reset();
      return;
    }

    throw new Error(result.message || '전송에 실패했습니다.');
  }

  Object.keys(fields).forEach(function (key) {
    if (key === 'privacy') return;
    fields[key].input.addEventListener('input', function () {
      showFieldError(fields[key], '');
    });
  });

  fields.privacy.input.addEventListener('change', function () {
    showFieldError(fields.privacy, '');
  });

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    clearErrors();

    if (!validateForm()) return;

    setLoading(true);

    try {
      await submitForm();
    } catch (err) {
      showStatus(
        '전송 중 오류가 발생했습니다. 잠시 후 다시 시도하시거나 ' + RECIPIENT_EMAIL + '으로 직접 연락해 주세요.',
        'error'
      );
      console.error('Form submit error:', err);
    } finally {
      setLoading(false);
    }
  });
})();
