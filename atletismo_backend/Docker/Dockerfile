FROM mysql:5.7.6
ADD files/run_db files/init_db files/schema.sql /tmp/
RUN /tmp/init_db
ENTRYPOINT "/tmp/run_db"
