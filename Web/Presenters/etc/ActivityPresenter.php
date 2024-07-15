<?php declare(strict_types=1);
namespace Web\etc\Presenters;
use Web\Entities\Localization;
use Web\Models\User;
use Web\Models\Sessions;
use Web\Models\Notifications;
use Latte;
#[\AllowDynamicProperties]
final class ActivityPresenter
{
    public function __construct()
    {
        $this->latte = new Latte\Engine();
        $this->latte->setTempDirectory($_SERVER['DOCUMENT_ROOT']."/temp");
    }

    public function load(array $params = []): void
    {
        $params += ["language" => $GLOBALS['language']];
        if(isset($_COOKIE['zhabbler_session'])){
            $session = (new Sessions())->get_session($_COOKIE['zhabbler_session']);
            $user = (new User())->get_user_by_token($session->sessionToken);
            $notifications = (new Notifications())->getAllNotifications($user->token);
            $params += ["user" => $user, "notifications" => $notifications];
            $this->latte->render($_SERVER['DOCUMENT_ROOT']."/Web/etc/activity.latte", $params);
        }else{
            die;
        }
    }
}
(new ActivityPresenter())->load();