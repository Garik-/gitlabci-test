FROM bash:3.2
COPY hello.sh /
CMD ["bash", "/hello.sh"]