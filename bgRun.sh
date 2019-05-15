echo "\033[31mYou're about to run the backend serveur in background process\033[0m"
read -p "make sure you know how to stop it before that, continue (y/n)? :  " -n 1 -r
if [[ ! $REPLY =~ ^[Yy]$ && ! $REPLY =~ ^[Nn]$ ]]
then
	echo "\033[3A"
	sh bgRun.sh
	exit 1
fi
if [[ ! $REPLY =~ ^[Yy]$ ]]
then
    exit 1
fi
cd backend ; npm run dev &
cd ../frontend ; ng serve --open
mbp-de-romain:alienAddressBook2 romain$
