require 'rubygems'
    require 'rake'
    require 'rdoc'
    require 'date'
    require 'yaml'
    require 'tmpdir'
    require 'jekyll'
message = "Site updated at #{Time.now.utc}"
    desc "Generate blog files"
    task :generate do
      Jekyll::Site.new(Jekyll.configuration({
        "source"      => ".",
        "destination" => "_site"
      })).process
    end

	desc "Update master branch"
	task :update => [:generate] do
		system "git add --all ."
		system "git commit -am #{message.shellescape}"
		system "git push origin master"
	end

    desc "Generate and publish blog to gh-pages"
    task :publish => [:update] do
      Dir.mktmpdir do |tmp|
        system "mv _site/* #{tmp}"
        system "git checkout -B gh-pages"
        system "rm -rf *"
        system "mv #{tmp}/* ."
        message = "Site updated at #{Time.now.utc}"
        system "git add ."
        system "git commit -am #{message.shellescape}"
        system "git push origin gh-pages --force"
        system "git checkout master"
        system "echo yolo"
      end
    end

task :default => :publish
