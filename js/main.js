/**
 * FLORA BEAUTY CENTER & SPA | HEBA AYOUB MAKEUP ARTIST - ALEXANDRIA
 * ملف الوظائف التفاعلية وتنسيق حجز الواتساب التلقائي
 */

document.addEventListener('DOMContentLoaded', () => {
  // رقم الواتساب الرسمي المعتمد لسنتر فلورا وميكب أرتيست هبة أيوب بالإسكندرية
  const WHATSAPP_PHONE_NUMBER = '201282344706';

  // 1. تصفية خدمات السنتر حسب الفئة
  const serviceTabBtns = document.querySelectorAll('.services-tab-btn');
  const serviceCategorySections = document.querySelectorAll('.service-category-group');

  if (serviceTabBtns.length > 0) {
    serviceTabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        serviceTabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const targetCat = btn.getAttribute('data-category');

        serviceCategorySections.forEach(section => {
          if (targetCat === 'all' || section.getAttribute('data-category') === targetCat) {
            section.style.display = 'block';
            setTimeout(() => {
              section.style.opacity = '1';
            }, 50);
          } else {
            section.style.opacity = '0';
            section.style.display = 'none';
          }
        });
      });
    });
  }

  // 2. تصفية صور المعرض (Lookbook Filter)
  const galleryFilterBtns = document.querySelectorAll('.gallery-tab-btn');
  const galleryItems = document.querySelectorAll('.gallery-item-col');

  if (galleryFilterBtns.length > 0) {
    galleryFilterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        galleryFilterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        galleryItems.forEach(item => {
          const category = item.getAttribute('data-gallery-cat');
          if (filter === 'all' || category === filter) {
            item.style.display = 'block';
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'translateY(0)';
            }, 40);
          } else {
            item.style.opacity = '0';
            item.style.transform = 'translateY(15px)';
            setTimeout(() => {
              item.style.display = 'none';
            }, 250);
          }
        });
      });
    });
  }

  // 3. التعبئة التلقائية لنوع الخدمة في نموذج الحجز عند النقر على زر "احجزي"
  const selectServiceInputs = document.querySelectorAll('.select-service-trigger');
  const bookingServiceDropdown = document.getElementById('bookingServiceSelect');

  selectServiceInputs.forEach(btn => {
    btn.addEventListener('click', () => {
      const serviceName = btn.getAttribute('data-service-name');
      if (bookingServiceDropdown && serviceName) {
        bookingServiceDropdown.value = serviceName;
      }
    });
  });

  // 4. معالجة وتجهيز رسالة حجز الواتساب الفورية من الفورم
  const bookingForm = document.getElementById('floraBookingForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('clientName').value.trim();
      const phone = document.getElementById('clientPhone').value.trim();
      const service = document.getElementById('bookingServiceSelect').value;
      const date = document.getElementById('preferredDate').value;
      const time = document.getElementById('preferredTime').value;
      const notes = document.getElementById('additionalNotes').value.trim();

      // صياغة رسالة واتساب أنيقة ومباشرة
      let message = `مرحباً سنتر فلورا وميكب أرتيست هبة أيوب، حابة أحجز موعد / أستفسر:\n`;
      message += `• الاسم: ${name}\n`;
      message += `• رقم الموبايل: ${phone}\n`;
      message += `• الخدمة أو الباكدج: ${service}\n`;
      if (date) {
        message += `• تاريخ المناسبة / اليوم: ${date}\n`;
      }
      if (time) {
        message += `• الوقت المفضل: ${time}\n`;
      }
      if (notes) {
        message += `• ملاحظات وتفاصيل: ${notes}\n`;
      }
      message += `\n(تم إرسال الطلب عبر الموقع الإلكتروني لسنتر فلورا)`;

      // تشفير الرسالة لرابط الواتساب
      const encodedMsg = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodedMsg}`;

      // فتح محادثة واتساب الرسمية مباشرة
      window.open(whatsappUrl, '_blank');
    });
  }

  // 5. إغلاق القائمة المنسدلة تلقائياً على شاشات الموبايل عند الضغط على أي رابط
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  const navbarCollapse = document.getElementById('floraNavContent');
  if (navbarCollapse) {
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth < 992 && navbarCollapse.classList.contains('show')) {
          const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
          if (bsCollapse) {
            bsCollapse.hide();
          }
        }
      });
    });
  }
});
