FROM nginx:1.18

COPY /build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

CMD nginx -g "daemon off;"