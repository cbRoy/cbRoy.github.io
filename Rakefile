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
		"destination" => "_site"
	})
end

desc "Update master branch with source"
task :update do
	message = "Site updated at #{Time.now.utc}"
	sh "git add --all ."
	sh "git commit -am #{message.shellescape}"
	sh "git push origin master"
end

desc "Generate and publish blog to gh-pages"
	task :publish => [:generate] do
		Dir.mktmpdir do |tmp|
		sh "mv _site/* #{tmp}"
		Dir.chdir('_site') do
			sh "git checkout -B gh-pages"
			sh "rm -rf *"
			sh "mv #{tmp}/* ."
			message = "Site updated at #{Time.now.utc}"
			sh "git add ."
			sh "git commit -am #{message.shellescape}"
			sh "git push origin gh-pages --force"
			# sh "git checkout master"
		end
	end
end

task :default => :publish
