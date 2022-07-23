# Jekyll::Hooks.register :posts, :post_write do |post|
#     all_existing_tags = Dir.entries("tags")
#       .map { |t| t.match(/(.*).md/) }
#       .compact.map { |m| m[1] }
  
#     tags = post['tags'].reject { |t| t.empty? }
    
#     puts post['title']

#     tags.each do |tag|
#       generate_tag_file(tag) if all_existing_tags.empty? || !all_existing_tags.include?(tag)
#     end
# end


# Inspired on: https://www.untangled.dev/2020/06/02/tag-management-jekyll/
# I made some changes from the original hook to include a cleaning up process of
# unused tag page file.
# Now, after any new site generation --- regardless the file, page, etc ---
# the tag page files will be generated and the unused ones deleted.
# The original post used a hook for Post, that was triggered after
# writing any post file. But, the hook is triggered for each individual post.
# Thus, it is not possible to obtain the unused tag page because we do not
# have access to all tags at once inside the hook (only the tags of that particular post).

def generate_tag_file(tag)
    # generate tag file
    File.open("tags/#{tag}.md", "wb") do |file|
        file << "---\nlayout: tags\ntag: #{tag}\n---\n"
    end
end


# clean unused tag page files
Jekyll::Hooks.register :site, :post_write do |site|
    puts "\n********* DELETE UNUSED TAG PAGE FILES ***********"
    
    all_existing_tags = Dir.entries("tags")
      .map { |t| t.match(/(.*).md/) }
      .compact.map { |m| m[1] }

    tags = site.tags.keys.reject { |t| t.empty? }

    tags.each do |tag|
      generate_tag_file(tag) if all_existing_tags.empty? || !all_existing_tags.include?(tag)
    end
    
    unused_tags = all_existing_tags - tags
    unused_tags.each do |unused_tag|
        tag_page_file = "tags/#{unused_tag}.md"
        puts tag_page_file
        File.delete(tag_page_file) if File.exist?(tag_page_file)
    end

    puts "***************************************************\n"
end
