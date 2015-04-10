require 'rubygems'
require 'rake'
require 'rdoc'
require 'date'
require 'yaml'
require 'tmpdir'
require 'jekyll'

desc "Generate blog files"
task :generate do
	Jekyll::Commands::Build.process({
		"source"      => ".",
		"destination" => "_site",
		"full_rebuild" => true
	})
end

desc "Update master branch with source"
task :update do
	message = "Site updated at #{Time.now.utc}"
	system "git checkout master"
	system "git add --all ."
	system "git commit -am #{message.shellescape}"
	system "git push origin master"
end

desc "Generate and publish blog to gh-pages"
	task :publish => [:generate] do
		Dir.mktmpdir do |tmp|
		system "mv _site/* #{tmp}"
		Dir.chdir('_site') do
			system "git checkout -B gh-pages"
			system "rm -rf *"
			system "mv #{tmp}/* ."
			message = "Site updated at '#{Time.now.utc}'"
			system "git add ."
			system "git commit --allow-empty -m #{message.shellescape}"
			system "git push origin gh-pages"
			# system "git checkout master"
		end
	end
end

task :default => :publish
