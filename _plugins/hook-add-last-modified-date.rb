# Solution copied from https://stackoverflow.com/questions/36758072/how-to-insert-the-last-updated-time-stamp-in-jekyll-page-at-build-time
Jekyll::Hooks.register :posts, :pre_render do |post|

  # get the current post last modified time
  modification_time = File.mtime( post.path )

  # inject modification_time in post's datas.
  post.data['last-modified-date'] = modification_time

end