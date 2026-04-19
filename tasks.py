from invoke import task

from server import run


@task
def serve(c, bind="127.0.0.1", port=8443, cert=None, key=None, host=None):
    del c
    run(bind=bind, port=port, certfile=cert, keyfile=key, display_host=host)
