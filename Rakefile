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
	message = "Site source updated at #{Time.now.utc}"
	system "git checkout master"
	system "git add --all ."
	system "git commit --allow-empty -m #{message.shellescape}"
	system "git push origin master"
end

desc "Generate and publish blog to gh-pages"
	task :publish => [:generate] do
		#Dir.mktmpdir do |tmp|
		#system "mv _site/* #{tmp}"
		#Dir.chdir('_site') do
	#		system "git checkout -B gh-pages"
	##		system "rm -rf *"
		#	system "mv #{tmp}/* ."
		#	message = "Site updated at '#{Time.now.utc}'"
		#	system "git add ."
		#	system "git commit --allow-empty -m #{message.shellescape}"
		#	system "git push origin gh-pages"
		#	# system "git checkout master"
		#end
	#end
	puts "Checking for gh-pages dir..."
    unless File.exist?("./gh-pages")
      puts "Creating gh-pages dir..."
      sh "git clone git@github.com:cbRoy/theroys.space gh-pages"
    end

    # Ensure latest gh-pages branch history.
    Dir.chdir('gh-pages') do
      sh "git checkout gh-pages"
      sh "git pull origin gh-pages"
    end

    # Proceed to purge all files in case we removed a file in this release.
    puts "Cleaning gh-pages directory..."
    purge_exclude = %w[
      gh-pages/.
      gh-pages/..
      gh-pages/.git
      gh-pages/.gitignore
    ]
    FileList["gh-pages/{*,.*}"].exclude(*purge_exclude).each do |path|
      sh "rm -rf #{path}"
    end

    # Copy site to gh-pages dir.
    puts "Building site into gh-pages branch..."
    ENV['JEKYLL_ENV'] = 'production'
    require "jekyll"
    Jekyll::Commands::Build.process({
      "source"       => File.expand_path("."),
      "destination"  => File.expand_path("gh-pages"),
      "sass"         => { "style" => "compressed" },
      "full_rebuild" => true
    })

    # Commit and push.
    puts "Committing and pushing to GitHub Pages..."
    sha = `git rev-parse HEAD`.strip
    Dir.chdir('gh-pages') do
      sh "git add --all ."
      sh "git commit --allow-empty -m 'Updating to #{sha}.'"
      sh "git push origin gh-pages"
    end
    puts 'Done.'
  end

task :default => :publish
