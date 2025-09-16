{ pkgs, ... }: {
  packages = [ pkgs.python3 ];
  idx.previews = {
    enable = true;
    previews = {
      web = {
        manager = "web";
        command = [ "python3" "-m" "http.server" "--bind" "127.0.0.1" "$PORT" ];
      };
    };
  };
}
